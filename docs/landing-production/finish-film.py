import json, subprocess, pathlib, urllib.request, zipfile
import numpy as np
import cv2
from PIL import Image, ImageDraw
ROOT=pathlib.Path('/home/user/final');ROOT.mkdir(exist_ok=True)
urls=json.loads(pathlib.Path('/home/user/urls.json').read_text())
names=['01-close','02-performance','03-planning','04-operations']
stats=[];sheets=[];firsts=[];lasts=[]
for idx,(url,name) in enumerate(zip(urls,names)):
 src=ROOT/(name+'-source.mp4');urllib.request.urlretrieve(url,src)
 info=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height,r_frame_rate','-of','json',str(src)]))['streams'][0]
 w,h=info['width'],info['height'];fps=eval(info['r_frame_rate'],{'__builtins__':{}})
 dec=subprocess.Popen(['ffmpeg','-v','error','-i',str(src),'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
 out=ROOT/(name+'.mp4')
 enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r',str(fps),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-g','8','-keyint_min','8','-sc_threshold','0','-movflags','+faststart',str(out)],stdin=subprocess.PIPE)
 frames=[];n=0;maxfraction=0
 while True:
  data=dec.stdout.read(w*h*3)
  if len(data)!=w*h*3:break
  a=np.frombuffer(data,np.uint8).reshape(h,w,3).copy()
  # Continuous neutral highlight correction avoids hard-key speckling.
  lo=a.min(axis=2).astype(np.float32);hi=a.max(axis=2).astype(np.float32)
  bright=np.clip((lo-180)/35,0,1);bright=bright*bright*(3-2*bright)
  neutral=np.clip((hi-lo-8)/24,0,1);neutral=1-neutral*neutral*(3-2*neutral)
  mask=bright*neutral
  maxfraction=max(maxfraction,float(mask.mean()))
  alpha=cv2.GaussianBlur(mask,(3,3),.5)[:,:,None]
  a=np.clip(a*(1-alpha)+np.array([242,242,240])*alpha,0,255).astype(np.uint8)
  enc.stdin.write(a.tobytes())
  if n==0:
   Image.fromarray(a).save(ROOT/(name+'.webp'),quality=95)
   firsts.append(a.copy())
  if n in [0,36,72,108,144]:
   frames.append(Image.fromarray(a).resize((384,216)))
  last=a;n+=1
 enc.stdin.close();assert enc.wait()==0;assert dec.wait()==0
 lasts.append(last.copy())
 Image.fromarray(last).save(ROOT/(name+'-last.png'))
 if idx==3:Image.fromarray(last).save(ROOT/'05-finale.webp',quality=95)
 row=Image.new('RGB',(384*5,246),'#F2F2F0');draw=ImageDraw.Draw(row)
 for j,im in enumerate(frames):row.paste(im,(j*384,30))
 draw.text((12,8),name,fill='#350D28');sheets.append(row)
 stats.append({'name':name,'frames':n,'width':w,'height':h,'fps':fps,'duration':n/fps,'background':'#F2F2F0','maxBackdropFraction':maxfraction})
 print('finished',name,flush=True)
sheet=Image.new('RGB',(1920,984),'#F2F2F0')
for i,row in enumerate(sheets):sheet.paste(row,(0,246*i))
sheet.save(ROOT/'contact-sheet.jpg',quality=90)
seams=[]
for i in range(3):
 mse=float(np.mean((lasts[i].astype(float)-firsts[i+1])**2))
 seams.append({'from':names[i],'to':names[i+1],'psnr':float(10*np.log10(255**2/max(mse,1e-10)))})
(ROOT/'qa.json').write_text(json.dumps({'clips':stats,'seams':seams},indent=2))
(ROOT/'concat.txt').write_text(''.join("file '"+name+".mp4'\n" for name in names))
subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',str(ROOT/'concat.txt'),'-c','copy','-movflags','+faststart',str(ROOT/'gfs-kl-four-rhythms.mp4')],check=True)
with zipfile.ZipFile(ROOT/'gfs-kl-assets.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in ROOT.iterdir():
  if f.suffix in ['.mp4','.png','.webp','.jpg','.json'] and not f.name.endswith('-source.mp4'):z.write(f,f.name)
print((ROOT/'qa.json').read_text())


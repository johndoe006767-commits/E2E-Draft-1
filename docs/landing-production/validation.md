# Validation

- Four generated 1280 × 720 clips, 24 fps, 145 frames each; approximately 24.17 seconds assembled.
- Each subsequent render uses the preceding clip's actual terminal frame. Final render also conditions on the opening clip's first frame.
- Reviewed sampled progression and opening/closing compositions. AI-rendered joins retain minor detail/colour drift; the web player applies a short crossfade at boundaries.
- Background finishing changed bright neutral pixels toward RGB 242,242,240 using a continuous mask, avoiding hard-key speckling. Ivory scene surfaces and magenta shadows remain part of the artwork.
- Browser: chapter navigation, opening and finale layouts, return-to-beginning control, and positive video seekable ranges verified. All four videos reported seekable end 6.041667 seconds.
- Browser console: no errors or warnings during the desktop checks.
- Narrow viewport DOM bounds: no horizontal overflow; final copy stays inside viewport. Native portrait generation was excluded. Actual iOS Safari was not tested.
- Reduced-motion media preference suppresses video loading in the player; still posters remain. Not exercised on a physical device.
- Spend: 90.5 Higgsfield credits. Remaining account balance: 9.5 credits after generation.

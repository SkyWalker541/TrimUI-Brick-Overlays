# Smart Pro ASPECT Mode Template Specification

## Dimensions (1280 × 720)

```
┌─────────────────────────────────────────────────────────────────┐
│ 0,0                                                            │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                                                               │ │
│ │                    GAME CONTENT                               │ │
│ │                    1280 × 720                                 │ │
│ │                    (Full stretch 16:9)                       │ │
│ │                                                               │ │
│ │                                                               │ │
│ │                                                               │ │
│ │                                                               │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ 1280,720                                                       │
└─────────────────────────────────────────────────────────────────┘
```

## Pixel Grid

| Region | Left | Width | Top | Height |
|--------|------|-------|-----|--------|
| Full Canvas | 0 | 1280 | 0 | 720 |
| Overlay Layer | 0 | 1280 | 0 | 720 |

## Recommended Layer Structure (PSD)

```
├── Background (transparent)
├── Overlay Effects
│   ├── Vignette (subtle corner darkening)
│   ├── Scanlines (optional, 5-10% opacity)
│   └── Color grading (optional)
├── Border Elements
│   ├── Top bezel (if any)
│   └── Bottom bezel (if any)
├── LED Indicators
│   ├── Top LED (centered at 640,20)
│   └── Bottom LED (centered at 640,700)
└── Adjustment Layer (brightness/contrast)
```

## Design Notes

- ASPECT mode stretches content to fill full screen
- No pillarboxing needed
- Focus on subtle overlays that enhance without obstructing
- Use vignette/scanlines for CRT-like effects (optional)
- LED placement more flexible (full width available)

## Export Checklist

- [ ] Canvas: 1280 × 720 px
- [ ] No letterboxing/pillars
- [ ] Format: PNG with transparency
- [ ] sRGB color profile
- [ ] Test with actual game content (stretch varies)

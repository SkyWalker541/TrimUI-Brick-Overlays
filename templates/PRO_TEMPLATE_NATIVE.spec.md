# Smart Pro NATIVE Mode Template Specification

## Dimensions (1280 × 720)

```
┌─────────────────────────────────────────────────────────────────┐
│ 0,0                                                            │
│ ┌─ SIDE PILLAR (160px) ───┐   ╔═════════════════════════════╗ │
│ │                         │   ║                               ║ │
│ │    (Optional: LEDs,     │   ║                               ║ │
│ │     branding, artwork)  │   ║       GAME CONTENT           ║ │
│ │                         │   ║       960 × 720              ║ │
│ │                         │   ║       (4:3 preserved)        ║ │
│ │                         │   ║                               ║ │
│ │                         │   ║                               ║ │
│ └─────────────────────────┘   ╚═════════════════════════════╝ │
│ 1280,720                                                       │
└─────────────────────────────────────────────────────────────────┘
```

## Pixel Grid

| Region | Left | Width | Top | Height |
|--------|------|-------|-----|--------|
| Left Pillar | 0 | 160 | 0 | 720 |
| Game Area | 160 | 960 | 0 | 720 |
| Right Pillar | 1120 | 160 | 0 | 720 |

## Recommended Layer Structure (PSD)

```
├── Background (transparent)
├── Side Pillars Group
│   ├── Left Pillar (dark overlay + effects)
│   └── Right Pillar (dark overlay + effects)
├── LED Indicators
│   ├── Top LED (centered at 640,30)
│   └── Bottom LED (centered at 640,690)
├── Decorative Elements
│   ├── Corner accents
│   └── Branding/artwork in pillars
└── Adjustment Layer (brightness/contrast)
```

## Export Checklist

- [ ] Canvas: 1280 × 720 px
- [ ] Game area centered: 160px offset from left
- [ ] Side pillars: 160px each, semi-transparent
- [ ] Format: PNG with transparency
- [ ] sRGB color profile

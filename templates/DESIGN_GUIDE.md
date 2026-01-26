# TrimUI Smart Pro Overlay Design Guide

## Screen Specifications

| Property | Value |
|----------|-------|
| Resolution | **1280 × 720 pixels** |
| Aspect Ratio | **16:9** |
| Screen Size | 4.96" IPS |
| Pixel Density | ~294 PPI |

## Canvas Setup

```
Width:  1280px
Height: 720px
DPI:    72 (for screen), 300+ (for print/export)
Color:  RGBA / 8-bit per channel
Format: PNG (with transparency)
```

## Design Zones

### Safe Content Area (Game Display)
```
┌────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════╗ │
│  ║                                       ║ │
│  ║       GAME CONTENT AREA               ║ │
│  ║       (varies by mode)                ║ │
│  ║                                       ║ │
│  ╚═══════════════════════════════════════╝ │
│  [Overlay elements: bezels, LEDs, etc.]    │
└────────────────────────────────────────────┘
```

### NATIVE Mode (Letterboxed)
- **Game content**: 960 × 720 (4:3, centered)
- **Side pillars**: 160px each side (transparent or styled)
- **Use when**: Original aspect ratio is critical

### ASPECT Mode (Stretched)
- **Game content**: 1280 × 720 (fills screen)
- **Use when**: Full-screen immersion preferred

## Overlay Element Guidelines

### Visual Hierarchy
1. **Game content** - Always primary, highest contrast
2. **Bezels/frames** - Subtle, don't distract
3. **LED indicators** - Accent colors, small footprint
4. **Text/branding** - Minimal, legible at glance

### Color Considerations
- Background elements: Use **subtle gradients** (5-15% opacity)
- LED elements: **High saturation** (70-100% saturation)
- Avoid pure black (#000) - use **dark grays** (#1a1a1a or darker)
- Test on actual device for accurate brightness perception

### Recommended Font Sizes
```
Small labels:    12-16px
Medium text:     18-24px
Large titles:    28-36px
```

### Common Element Positions

```
Top LED:        y: 20-40, x: centered
Bottom LED:     y: 680-700, x: centered
Side buttons:   x: 20-40 or 1240-1260
Corner accents: 40px insets from edges
```

## Naming Convention

```
PRO_[SYSTEM]_[MODE]_[STYLE]_[VARIANT].png

Components:
- PRO:          Device identifier (Smart Pro)
- SYSTEM:       GB, GBA, GBC, GBCAT, etc.
- MODE:         NATIVE (letterboxed) or ASPECT (stretched)
- STYLE:        LED, OG, HOLOGRAPHIC, etc.
- VARIANT:      RED, BLUE, POKEMON, etc.
```

### Examples
```
PRO_GB_NATIVE_RED_LED.png
PRO_GBA_ASPECT_OG.png
PRO_GBC_NATIVE_BLUE_LED_JP.png
```

## Export Settings

1. **Format**: PNG-24 with alpha transparency
2. **Compression**: None (quality > file size for overlays)
3. **Color profile**: sRGB
4. **Dimensions**: Exactly 1280 × 720 px
5. **Layer structure**: Keep original file with layers

## Testing Checklist

- [ ] Visual check on actual TrimUI Smart Pro device
- [ ] Game content remains clearly visible
- [ ] No color banding or artifacts
- [ ] Transparency works correctly
- [ ] Performance test (no lag on game launch)
- [ ] Multiple games tested (different content ratios)

## File Organization

```
templates/
├── DESIGN_GUIDE.md           (this file)
├── PRO_TEMPLATE_1280x720.psd (Photoshop template)
├── PRO_TEMPLATE_NATIVE.psd   (NATIVE mode preset)
└── PRO_TEMPLATE_ASPECT.psd   (ASPECT mode preset)

PRO/                          (final output directory)
├── GB/
├── GBA/
└── GBC/
```

## Common Design Patterns

### 1. Classic Bezel Style
```
- Dark inner border (8-16px)
- Subtle gradient overlay
- Small LED accents at corners
- 80% opacity black overlay outside game area
```

### 2. Minimalist LED
```
- No bezels
- Single LED indicator (top or bottom)
- Transparent edges
- Focus on game content
```

### 3. Holographic Effect
```
- Iridescent gradient overlays
- Multiple semi-transparent layers
- Sparkle/flare effects at LEDs
- Higher contrast required for readability
```

### 4. Themed (Pokemon, etc.)
```
- Character/artwork integration
- Color palette matching theme
- Iconography relevant to theme
- Balance brand vs. visibility
```

## Tips from TrimUI Brick Experience

1. **The "Pillar Problem"**: NATIVE mode on 16:9 has 320px of horizontal space
   - Use for creative elements (battery indicators, branding)
   - Keep transparency high to avoid "boxed in" feeling

2. **LED Brightness**: What looks good on desktop monitor may be too bright on small screen
   - Reduce opacity by 20-30% from desktop preview

3. **Aspect Ratio Stretch**: ASPECT mode distortion varies by game
   - Some games stretch better than others
   - Consider offering both options for each system

## Resources

- **Conversion script**: `bun run convert` (auto-convert from Brick overlays)
- **Test images**: Place in `PRO/test/` for device testing
- **Community feedback**: Share previews in issues/discussions

# TrimUI Overlay Collection

Custom overlay skins for TrimUI handheld gaming consoles. Optimized for NextUI with compatibility for RetroArch and other custom firmwares.

## Quick Start

**For TrimUI Smart Brick:**
- Drag and drop the `BRICK/` folder into NextUI's "Overlays" folder

**For TrimUI Smart Pro:**
- Drag and drop the `PRO/` folder into NextUI's "Overlays" folder
- Or use the conversion script (see below)

---

## Device Specifications

| Feature | Smart Brick | Smart Pro |
|---------|-------------|-----------|
| **Resolution** | 1024 × 768 | 1280 × 720 |
| **Aspect Ratio** | 4:3 | 16:9 |
| **Screen Size** | 3.2" IPS | 4.96" IPS |
| **PPI** | ~400 | ~294 |

---

## Smart Brick Overlays (1024 × 768)

### Installation

Drag and drop the `BRICK/` folder into NextUI's "Overlays" folder.

These overlays are made with NextUI in mind and don't include separate .cfg files. For RetroArch or other firmware, you may need to create config files.

### Game Boy (GB)

| Preview | Name | Mode |
|---------|------|------|
| <img width="200" alt="RED LED" src="https://github.com/user-attachments/assets/7925c25b-4288-4470-99db-02cc8091415e" /> | BRICK_GB_NATIVE_RED_LED | Native (4:3) |
| <img width="200" alt="BLUE LED" src="https://github.com/user-attachments/assets/27aed77f-27d7-4b03-b36c-74ffe77d07d3" /> | BRICK_GB_NATIVE_BLUE_LED | Native (4:3) |
| <img width="200" alt="RED LED" src="https://github.com/user-attachments/assets/4e28c7e6-ee46-473c-b539-1f1b31d93ad9" /> | BRICK_GB_ASPECT_RED_LED | Aspect (stretched) |
| <img width="200" alt="BLUE LED" src="https://github.com/user-attachments/assets/62ece555-8099-49fa-b7ff-94fa355a0abe" /> | BRICK_GB_ASPECT_BLUE_LED | Aspect (stretched) |

### Game Boy Advance (GBA)

| Preview | Name |
|---------|------|
| <img width="200" src="https://github.com/user-attachments/assets/5fc00a7f-5446-4b3e-ae0e-e74d16248159" /> | BRICK_GBA_NATIVE_OG |
| <img width="200" src="https://github.com/user-attachments/assets/9bb51093-55c0-4841-a4a3-52b5f70ee150" /> | BRICK_GBA_NATIVE_OG_POKEMON |
| <img width="200" src="https://github.com/user-attachments/assets/2dfd0d79-c46f-4ea6-a78a-686429d1d950" /> | BRICK_GBA_NATIVE_HOLOGRAPHIC |
| <img width="200" src="https://github.com/user-attachments/assets/126e9d0d-2a80-4373-a528-ecabfa417a32" /> | BRICK_GBA_NATIVE_HOLOGRAPHIC_POKEMON |
| <img width="200" src="https://github.com/user-attachments/assets/08a26ff8-0ab7-4381-bec8-324b87dbbafb" /> | BRICK_GBA_ASPECT_OG |
| <img width="200" src="https://github.com/user-attachments/assets/316202e4-a5d5-4510-8246-8720f36c2496" /> | BRICK_GBA_ASPECT_HOLOGRAPHIC |

### Game Boy Color (GBC)

| Preview | Name |
|---------|------|
| <img width="200" src="https://github.com/user-attachments/assets/7fe04e0b-a9d3-4c25-9e64-82eb58c22b69" /> | BRICK_GBC_NATIVE_RED_LED |
| <img width="200" src="https://github.com/user-attachments/assets/9376a173-1d87-44bb-8cc5-35ce6ab48bfa" /> | BRICK_GBC_NATIVE_BLUE_LED |
| <img width="200" src="https://github.com/user-attachments/assets/94c9aed2-b679-41e3-9d31-025e9a824419" /> | BRICK_GBC_ASPECT_RED_LED |
| <img width="200" src="https://github.com/user-attachments/assets/56df41f4-e4fb-43db-87e6-951b6da14e65" /> | BRICK_GBC_ASPECT_BLUE_LED |
| <img width="200" src="https://github.com/user-attachments/assets/e1ef773e-6494-4f0b-b90c-b7bd194d81d8" /> | BRICK_GBC_NATIVE_RED_LED_JAPANESE |
| <img width="200" src="https://github.com/user-attachments/assets/d84aeb9b-3df1-4993-a33c-9a956183c333" /> | BRICK_GBC_NATIVE_BLUE_LED_JAPANESE |
| <img width="200" src="https://github.com/user-attachments/assets/4a3d95e9-e8bc-4cbc-971b-5d4404569f1f" /> | BRICK_GBC_ASPECT_RED_LED_JAPANESE |
| <img width="200" src="https://github.com/user-attachments/assets/4467fe94-557e-4bc1-97a6-01780002f90b" /> | BRICK_GBC_ASPECT_BLUE_LED_JAPANESE |

---

## Smart Pro Overlays (1280 × 720)

### Installation

#### Option 1: Use Pre-converted Overlays

If the `PRO/` folder exists, simply drag and drop it into NextUI's "Overlays" folder.

#### Option 2: Convert from Brick Overlays

Use the included conversion script to create Smart Pro overlays from the existing Brick collection:

```bash
# Install dependencies
cd scripts
bun install

# Convert all overlays (both NATIVE and ASPECT modes)
bun run convert

# Convert only NATIVE mode (letterboxed 4:3)
bun run convert:native

# Convert only ASPECT mode (stretched to 16:9)
bun run convert:aspect

# Preview what would be converted (dry run)
bun run convert:dry
```

**What the script does:**

| Mode | Conversion Method | Result |
|------|-------------------|--------|
| NATIVE | Letterbox | 4:3 content centered with side pillars (160px each) |
| ASPECT | Stretch | Content fills 16:9 screen |

### Design Your Own

Use the design templates in `templates/` to create custom Smart Pro overlays:

- `DESIGN_GUIDE.md` - Comprehensive design specifications
- `PRO_TEMPLATE_NATIVE.spec.md` - NATIVE mode dimensions
- `PRO_TEMPLATE_ASPECT.spec.md` - ASPECT mode dimensions

---

## Naming Convention

```
[DEVICE]_[SYSTEM]_[MODE]_[STYLE]_[VARIANT].png
```

| Component | Values |
|-----------|--------|
| DEVICE | `BRICK` (Smart Brick), `PRO` (Smart Pro) |
| SYSTEM | `GB`, `GBA`, `GBC`, etc. |
| MODE | `NATIVE` (original ratio), `ASPECT` (stretched) |
| STYLE | `LED`, `OG`, `HOLOGRAPHIC`, etc. |
| VARIANT | `RED`, `BLUE`, `POKEMON`, etc. |

---

## Compatibility

- **NextUI**: Drag-and-drop, no config needed
- **RetroArch**: May require custom .cfg files
- **Other firmware**: Config files may be needed

---

## License

This overlay collection is provided as-is for personal use with TrimUI devices.

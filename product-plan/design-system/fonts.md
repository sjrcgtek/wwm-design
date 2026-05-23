# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>` or global CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Or via CSS `@import`:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

## Font Usage

- **Headings & Body:** DM Sans — a clean, modern sans-serif with optical sizing
- **Code/technical:** IBM Plex Mono — monospace for any code or technical content

## Applying Fonts

In your global CSS or Tailwind config:

```css
body {
  font-family: 'DM Sans', sans-serif;
}

code, pre, .font-mono {
  font-family: 'IBM Plex Mono', monospace;
}
```

The `AppShell` component applies `font-['DM_Sans',sans-serif]` via Tailwind's arbitrary font utility. Ensure DM Sans is loaded before the shell renders.

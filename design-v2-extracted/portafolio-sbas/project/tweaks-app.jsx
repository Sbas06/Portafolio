// tweaks-app.jsx — Tweaks for the coastal-steampunk portfolio.
// Applies via :root CSS vars + body classes. Panel-only render.

const PALETTES = {
  coast: {
    label: 'Coastal Day',
    vars: {
      '--bg-sky': '#E6F0EE', '--bg-sand': '#F3EADA', '--panel': '#FCFEFD', '--panel-2': '#EEF6F4', '--panel-sand': '#F8F1E4',
      '--ink': '#163842', '--ink-soft': '#466A71', '--ink-mute': '#8AA6A6', '--line': '#C9D9D5', '--line-strong': '#163842',
      '--sea': '#2C8FA3', '--sea-deep': '#155F70', '--foam': '#79C7C2',
      '--brass': '#B5832E', '--brass-light': '#DDB05A', '--brass-dark': '#7E5A1E', '--copper': '#BC6B3F',
      '--sun': '#E9B23F', '--coral': '#DD6B4F', '--led': '#4FB286', '--red': '#D24F5E',
    },
  },
  sunset: {
    label: 'Sunset Harbor',
    vars: {
      '--bg-sky': '#FBEEE2', '--bg-sand': '#F8E6D0', '--panel': '#FFFCF8', '--panel-2': '#FBEDE0', '--panel-sand': '#FAEAD6',
      '--ink': '#3A2630', '--ink-soft': '#7A5560', '--ink-mute': '#B79AA0', '--line': '#E6CDBE', '--line-strong': '#3A2630',
      '--sea': '#E07A52', '--sea-deep': '#B4502F', '--foam': '#F2B07C',
      '--brass': '#C68A33', '--brass-light': '#E6B45A', '--brass-dark': '#8A5C1E', '--copper': '#C76A45',
      '--sun': '#F0A93C', '--coral': '#D9514F', '--led': '#C99A3C', '--red': '#C7424F',
    },
  },
  deepsea: {
    label: 'Deep Sea',
    vars: {
      '--bg-sky': '#0E2730', '--bg-sand': '#13313A', '--panel': '#173A44', '--panel-2': '#1C434E', '--panel-sand': '#1E3D40',
      '--ink': '#E7F4F1', '--ink-soft': '#A7C9C8', '--ink-mute': '#6E9296', '--line': '#2C5662', '--line-strong': '#0A1C22',
      '--sea': '#37C2C0', '--sea-deep': '#1E8E96', '--foam': '#6FE0D6',
      '--brass': '#D9A94A', '--brass-light': '#F0CB6C', '--brass-dark': '#9A7426', '--copper': '#D98A5A',
      '--sun': '#F0C24A', '--coral': '#F08060', '--led': '#5FD89A', '--red': '#E96A78',
    },
  },
  brass: {
    label: 'Brass Workshop',
    vars: {
      '--bg-sky': '#F1EADC', '--bg-sand': '#EADFC7', '--panel': '#FCF8EF', '--panel-2': '#F1E9D6', '--panel-sand': '#F3EAD3',
      '--ink': '#2E2417', '--ink-soft': '#665536', '--ink-mute': '#A6926A', '--line': '#D8C9A8', '--line-strong': '#2E2417',
      '--sea': '#3F8F86', '--sea-deep': '#27645E', '--foam': '#86C2B4',
      '--brass': '#A9772E', '--brass-light': '#D6A746', '--brass-dark': '#6E4C18', '--copper': '#B5663A',
      '--sun': '#D99B33', '--coral': '#CC6442', '--led': '#7D9A40', '--red': '#C2543E',
    },
  },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "coast",
  "depth": 1,
  "tide": true
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    const vars = (PALETTES[t.palette] || PALETTES.coast).vars;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [t.palette]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--plx', t.depth);
  }, [t.depth]);

  React.useEffect(() => {
    document.body.classList.toggle('no-tide', !t.tide);
  }, [t.tide]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme" />
      <TweakSelect
        label="Palette"
        value={t.palette}
        options={Object.keys(PALETTES).map((k) => ({ value: k, label: PALETTES[k].label }))}
        onChange={(v) => setTweak('palette', v)}
      />

      <TweakSection label="Motion" />
      <TweakSlider label="Parallax depth" value={t.depth} min={0} max={2.5} step={0.1} unit="×"
                   onChange={(v) => setTweak('depth', v)} />
      <TweakToggle label="Tide animation" value={t.tide} onChange={(v) => setTweak('tide', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);

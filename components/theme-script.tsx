/**
 * Sets the theme before first paint to avoid a flash. Only applies an explicit
 * choice saved by the user; otherwise the CSS prefers-color-scheme rules decide.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

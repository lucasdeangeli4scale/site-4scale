type BrandLogoProps = {
  className?: string;
  presentation?: "mask" | "image";
};

export function BrandLogo({ className, presentation = "mask" }: BrandLogoProps) {
  if (presentation === "image") {
    const classes = className ? `panel-logo ${className}` : "panel-logo";
    return <img className={classes} src="/brand/logo.png" alt="4SCALE" />;
  }

  const classes = className ? `brand-logo ${className}` : "brand-logo";

  return (
    <span className={classes} aria-hidden="true">
      <span className="brand-logo-base" />
      <span className="brand-logo-accent" />
    </span>
  );
}

declare const process: {
  env: {
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?: string;
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY?: string;
    [key: string]: string | undefined;
  };
};

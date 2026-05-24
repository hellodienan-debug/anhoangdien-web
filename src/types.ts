export interface SlideContent {
  title: string;
  subtitle: string;
}

export interface ContentData {
  s1: {
    title: string;
    subtitle: string;
    body: string;
    highlights: string[];
    images: { portrait: string; background: string };
  };
  s2: {
    title: string;
    subtitle: string;
    body: string;
    phone: string;
    email: string;
    location: string;
    images: { icon_phone: string; icon_email: string; icon_location: string; map: string };
  };
  s3: {
    title: string;
    subtitle: string;
    body: string;
    highlights: string[];
    images: { logo: string; visual: string };
  };
  s4: {
    title: string;
    subtitle: string;
    body: string;
    highlights: string[];
    images: { skills: string; tools: string; language: string };
  };
  s5: {
    title: string;
    subtitle: string;
    body: string;
    highlights: string[];
    images: { visual: string };
  };
  s6: {
    title: string;
    subtitle: string;
    body: string;
    highlights: string[];
    images: { visual: string };
  };
  s7: {
    title: string;
    subtitle: string;
    body: string;
    highlights: string[];
    images: { visual: string };
  };
  s8: {
    title: string;
    subtitle: string;
    body: string;
    highlights: string[];
    images: { visual: string };
  };
  s9: {
    title: string;
    subtitle: string;
    body: string;
    highlights: string[];
    images: { background: string; signature: string };
  };
}

import { Code2, GitPullRequest, Heart, User } from "lucide-react";

const footerLinks = [
  {
    icon: Heart,
    label: "Donate",
    href: "https://buymeacoffee.com/kibiwottdep",
  },
  {
    icon: GitPullRequest,
    label: "Request Feature",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSd1MVDOvLGS-KuYe9gHfwQs2mFJ9nNkrEk1nyO_W4-9udgWRA/viewform?usp=publish-editor",
  },
  {
    icon: User,
    label: "Support",
    href: "mailto:kibiwottderick@gmail.com",
  },
  {
    icon: Code2,
    label: "Contribute",
    href: "http://github.com/derick-kibiwott/cleaner-tube",
  },
];

export function Footer() {
  return (
    <footer className="flex gap-3 p-4 justify-between">
      {footerLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          className="flex gap-1 items-center font-medium text-foreground/80 hover:text-foreground"
        >
          <link.icon className="size-4" />
          {link.label}
        </a>
      ))}
    </footer>
  );
}

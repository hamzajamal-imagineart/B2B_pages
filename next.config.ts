import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /business merged into / — see app/page.tsx. Permanent, because production
  // already serves that path and the link equity should follow.
  //
  // NOTE: `redirects` is a server feature. If this project moves to
  // `output: "export"`, this stops applying and the redirect has to be set on
  // the host proxy instead.
  async redirects() {
    return [{ source: "/business", destination: "/", permanent: true }];
  },
};

export default nextConfig;

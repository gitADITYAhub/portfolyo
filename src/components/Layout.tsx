import { ReactNode } from 'react';

// ----------------

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div id="content" className="site-content">
      {children}
    </div>
  );
}

export default Layout;

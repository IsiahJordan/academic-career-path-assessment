export type NavItem = {
  title: string;
  path: string;
  requiresAuth?: boolean;
};

export type NavProps = {
  items: NavItem[];
};

// Portfolio Items Data Types
export type PortfolioItemType = {
  order: number;
  category: string;
  action: {
    type: string;
    number: number;
  };
  description: {
    text: string;
    caption: string;
  };
};

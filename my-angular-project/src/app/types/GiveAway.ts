export interface giveAway {
    objectId: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    author: Author;
    signed: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CallBackAfterCreate {
    createdAt: string;
    objectId: string;
  }
  
  interface Author {
    __type: 'Pointer';
    className: '_User';
    objectId: string;
  }
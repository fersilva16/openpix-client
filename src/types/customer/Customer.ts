export type TaxID = {
  taxID: string;
  type: string;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  taxID: TaxID;
  correlationID: string;
};

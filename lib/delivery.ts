export interface DeliveryZone {
    id: string;
    label: string;
    fee: number;
}

export const DELIVERY_ZONES: DeliveryZone[] = [
    { id: 'lagos-island', label: 'Lagos Island', fee: 5000 },
    { id: 'lagos-mainland', label: 'Lagos Mainland', fee: 6000 },
    { id: 'ikorodu', label: 'Ikorodu', fee: 7000 },
    { id: 'meiran', label: 'Meiran', fee: 8000 },
    { id: 'alagbado', label: 'Alagbado', fee: 10000 },
    { id: 'outside-lagos', label: 'Outside Lagos (Standard)', fee: 10000 },
    { id: 'outside-lagos-home', label: 'Outside Lagos (Home Delivery)', fee: 18000 },
];

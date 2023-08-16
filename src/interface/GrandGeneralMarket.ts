export interface Item {
    icon: string
    icon_large: string
    id: number
    type: string
    typeIcon: string
    name: string
    description: string
    current: {
        trend: string
        price: number | string;
    };
    today: {
        trend: string
        price: number | string
    };
    members: "true" | "false"
}

export interface LetterObject {
    letter: string
    items: number
}
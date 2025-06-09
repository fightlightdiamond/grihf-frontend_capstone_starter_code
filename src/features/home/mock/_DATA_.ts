import {faker} from "@faker-js/faker";
import {
    TBestService,
} from "../types";

export const bestServices: TBestService[] =  [
    {
        id: 1,
        image: `/Genshin/Hinh-nen-Genshin-Impact (3).jpg`,
        title: 'Instant Consultation',
        link: '/health-tips-and-guidance',
        createdAt: faker.date.anytime().toLocaleString()
    },
    {
        id: 2,
        image: `/Genshin/Hinh-nen-Genshin-Impact (4).jpg`,
        title: 'Book an Appointment',
        link: '/find-doctor',
        createdAt: faker.date.anytime().toLocaleString()
    },
    {
        id: 3,
        image: `/Genshin/Hinh-nen-Genshin-Impact (5).jpg`,
        title: 'Self Checkup',
        link: '/review',
        createdAt: faker.date.anytime().toLocaleString()
    },
    {
        id: 4,
        image: `/Genshin/Hinh-nen-Genshin-Impact (6).jpg`,
        title: 'Health Tips and Guidance',
        link: '/health-tips-and-guidance',
        createdAt: faker.date.anytime().toLocaleString()
    },
]

export function _getBestService(bestServiceId: number): Promise<TBestService | undefined> {
    const bestService = bestServices.find((p) => p.id === bestServiceId);

    return Promise.resolve(bestService);
}

export function _getBestServices(): Promise<TBestService[]> {
    return Promise.resolve(bestServices);
}

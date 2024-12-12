import type { CollectionConfig } from "payload";

export const tourLocations: CollectionConfig = {
    slug: "tourLocations",
    fields: [
    {
        name: 'start',
        type: 'date'
    },
    {
        name: 'end',
        type: 'date',
    },
    {
        name: 'city',
        type: 'text'
    },
    {
        name: 'address',
        type: 'text'
    },
    {
        name: 'venue',
        type: 'point'
    },
    {
        name: 'description',
        type: 'richText'
    },
    {
        name: 'banner',
        type: 'upload',
        relationTo: 'media'
    }
    ]
}
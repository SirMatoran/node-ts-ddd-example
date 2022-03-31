import { SecondStage } from './second-stage.dto'

export interface Rocket {
    rocket_id: string
    rocket_name: string
    second_stage: SecondStage
    flickr_images: string[]
    description: string
}

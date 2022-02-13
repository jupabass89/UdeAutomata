export interface ITransision {
    state: string;
    inputs: IInput[],

}

export interface IInput {
    to: string;
    value: string;
}
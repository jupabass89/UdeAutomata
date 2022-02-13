import { IState } from "./IStae";
import { ITransision } from "./ITransision";

export interface IAutomata {
    states?: IState[],
	inputs?: string[],
    type?: number,
    transicions?: ITransision[],
}
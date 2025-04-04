import moment from "moment";
import {TimeProviderInterface} from "./time-provider-interface";

const SUNDAY = 0;
const SATURDAY = 6;

export class RealTimeProvider implements TimeProviderInterface {
   getDay(): number {
       return moment().day();
   }
}

export class PasswordVerifier {
   #timeProvider: TimeProviderInterface;

   constructor(rules:any[], timeProvider:TimeProviderInterface){
      this.#timeProvider = timeProvider;
   }

   verify(input:string):string[]{
      const isWeekend = [SUNDAY, SATURDAY].filter(x=>x === this.#timeProvider.getDay()).length > 0
      if(isWeekend){
         throw new Error("It's the weekend!")
      }
      return []
   }
}
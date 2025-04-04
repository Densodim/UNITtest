import { test, expect, describe } from '@jest/globals';
import {TimeProviderInterface} from "../../src/Password/TypeScript/time-provider-interface";
import {PasswordVerifier} from "../../src/Password/TypeScript/RealTimeProvider";

const SUNDAY = 0;
const SATURDAY = 6;

class FakeTimeProvider implements TimeProviderInterface {
   fakeDay: number;
   constructor() {
      this.fakeDay = 0;
   }
   getDay(): number {
      return this.fakeDay;
   }
}

describe('password verifier with interface', ()=>{
   test('on weekend, throws exception', () => {
     const stubTimeProvider = new FakeTimeProvider();
     stubTimeProvider.fakeDay = SUNDAY;
     const verifier = new PasswordVerifier([], stubTimeProvider);

     expect(()=>verifier.verify('anything')).toThrow("It's the weekend!")
   })
})
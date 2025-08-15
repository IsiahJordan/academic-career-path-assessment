import api from './api'

export function getTest(){
  return api.get("/");
}

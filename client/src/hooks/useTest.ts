import { useQuery } from '@tanstack/react-query'
import { getTest } from '@/services/TestService'

export function useTest(){
  return useQuery({
    queryKey: ["test"], 
    queryFn: async () => { 
      const res = await getTest();
      console.log(res.data);
      return res.data;
    }
  });
}

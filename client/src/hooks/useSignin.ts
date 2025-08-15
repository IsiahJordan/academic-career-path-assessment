import { useMutation } from '@tanstack/react-query'
import { postSignin} from '@/services/AuthService'

export function useSignin(){
  return useMutation({
    mutationFn: postSignin
  });
}

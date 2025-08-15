import { useMutation } from '@tanstack/react-query'
import { postSignup, postAccountCheck } from '@/services/AuthService'

export function useSignup(){
  return useMutation({
    mutationFn: async (formData) => {
      const exist = await postAccountCheck({
        email: formData.email,
        full_name: formData.full_name
      });

      if (exist.status === 0){
        throw new Error("Email or full name already taken");
      }

      return await postSignup(formData);
    }
  });
}

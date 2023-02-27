import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { ILoginFormValues } from '../../../providers/UserContext/@Types';
import { UserContext } from '../../../providers/UserContext/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>()

  const {userLogin} = useContext(UserContext)

  const submit: SubmitHandler<ILoginFormValues> = (formData)=>{
    userLogin(formData)
  }
  return (
  <StyledForm onSubmit={handleSubmit(submit)}>
    <Input label='Email' type='email' register={register("email")} error={errors.email}/>
    <Input label='Senha' type='password' register={register("password")} error={errors.password} />
    <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
      Entrar
    </StyledButton>
  </StyledForm>
  )
};

export default LoginForm;

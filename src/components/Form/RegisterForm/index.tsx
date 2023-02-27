import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { IRegisterFormValues } from '../../../providers/UserContext/@Types';
import { UserContext } from '../../../providers/UserContext/UserContext';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>();

  const {registerUser} = useContext(UserContext)

  const submit: SubmitHandler<IRegisterFormValues> = (formData)=>{
    registerUser(formData)
  }
  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type='text'
        label='Nome'
        register={register('name')}
        error={errors.name}
      />
      <Input
        type='email'
        label='Email'
        register={register('email')}
        error={errors.email}
      />
      <Input
        type='password'
        label='Senha'
        register={register('password')}
        error={errors.password}
      />
      <Input
        type='password'
        label='Confirmar Senha'
        register={register('confirmPassword')}
        error={errors.password}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;

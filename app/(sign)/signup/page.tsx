'use client';

import { ERROR_MESSAGES } from 'constant/errorMessage';
import { REG_EXP } from 'constant/regexp';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface FormData {
  email: string;
  nickname: string;
  password: string;
}

const SignupPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const email = watch('email');
  const password = watch('password');

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const response = await fetch('https://sp-taskify-api.vercel.app/4-14/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const responseData = await response.json();
        alert('이미 사용중인 이메일입니다');
        return responseData;
      }

      alert('가입이 완료되었습니다');
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <div className='h-screen bg-white'>
      <div className='mx-auto max-h-fit min-h-screen w-full max-w-lg flex-col px-12 py-16 text-center'>
        <Link href='/'>
          <div className='mx-auto my-0 inline-block justify-center'>
            <Image src='/logo/main_site_logo.png' alt='메인 로고 이미지' width={200} height={279} />
          </div>
        </Link>
        <h1 className='mt-[10px] text-lg font-GS font-extrabold'>첫 방문을 환영합니다!</h1>
        <form className='mt-[38px] w-full' onSubmit={handleSubmit(onSubmit)}>
          <label className='flex mb-2 text-16 font-GS font-bold' htmlFor='email'>
            이메일
          </label>
          <Controller
            name='email'
            control={control}
            rules={{
              required: ERROR_MESSAGES.email.field,
              pattern: {
                value: REG_EXP.VALID_EMAIL,
                message: ERROR_MESSAGES.email.pattern,
              },
            }}
            render={({ field, fieldState }) => (
              <div className='mb-4'>
                <input
                  {...field}
                  className={`border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-full ${
                    fieldState.invalid ? 'border-tp-red' : ''
                  }`}
                  placeholder='이메일을 입력해주세요'
                />
                {fieldState.invalid && (
                  <small className='flex mt-1 font-GS font-medium text-red-500'>{fieldState.error?.message}</small>
                )}
              </div>
            )}
          />
          <label className='flex mb-2 text-16 font-GS font-bold' htmlFor='email'>
            닉네임
          </label>
          <Controller
            name='nickname'
            control={control}
            rules={{
              required: ERROR_MESSAGES.nickname.field,
              validate: value => value.length <= 10 || ERROR_MESSAGES.nickname.pattern,
            }}
            render={({ field, fieldState }) => (
              <div className='mb-4'>
                <input
                  {...field}
                  className={`border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-full ${
                    fieldState.invalid ? 'border-tp-red' : ''
                  }`}
                  placeholder='닉네임을 입력해주세요'
                />
                {fieldState.invalid && (
                  <small className='flex mt-1 font-GS font-medium text-red-500'>{fieldState.error?.message}</small>
                )}
              </div>
            )}
          />
          <label className='flex mb-2 text-16 font-GS font-bold' htmlFor='email'>
            비밀번호
          </label>
          <Controller
            name='password'
            control={control}
            rules={{
              required: ERROR_MESSAGES.password.field,
              minLength: {
                value: 8,
                message: ERROR_MESSAGES.password.pattern,
              },
            }}
            render={({ field, fieldState }) => (
              <div className='mb-4 relative'>
                <input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  className={`border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-full ${
                    fieldState.invalid ? 'border-tp-red' : ''
                  }`}
                  placeholder='비밀번호를 입력해주세요'
                />
                <span
                  className='absolute top-[13px] right-[15px] cursor-pointer'
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '😀' : '😑'}
                </span>
                {fieldState.invalid && (
                  <small className='flex mt-1 font-GS font-medium text-red-500'>{fieldState.error?.message}</small>
                )}
              </div>
            )}
          />
          <label className='flex mb-2 text-16 font-GS font-bold' htmlFor='email'>
            비밀번호 확인
          </label>
          <Controller
            name='confirmPassword'
            control={control}
            rules={{
              required: ERROR_MESSAGES.passwordCheck.field,
              validate: value => value === watch('password') || ERROR_MESSAGES.passwordCheck.pattern,
            }}
            render={({ field, fieldState }) => (
              <div className='relative mb-4'>
                <input
                  {...field}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-full ${
                    fieldState.invalid ? 'border-tp-red' : ''
                  }`}
                  placeholder='비밀번호를 한번 더 입력해주세요'
                />
                <span
                  className='absolute top-[13px] right-[15px] cursor-pointer'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? '😀' : '😑'}
                </span>
                {fieldState.invalid && (
                  <small className='flex mt-1 font-GS font-medium text-red-500'>{fieldState.error?.message}</small>
                )}
              </div>
            )}
          />
          <Controller
            name='termsAccepted'
            control={control}
            rules={{
              validate: value => value || ERROR_MESSAGES.termsAccepted.pattern,
            }}
            render={({ field }) => (
              <div className='flex mb-4'>
                <label className='flex'>
                  <input
                    type='checkbox'
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    checked={field.value}
                    ref={field.ref}
                  />
                  <p className='ml-1'>이용약관에 동의합니다.</p>
                </label>
                {errors.termsAccepted && <p className='text-red-500'> 야! 동의 좀 하라고</p>}
              </div>
            )}
          />
          <button
            type='submit'
            disabled={!email || !password}
            className={'h-[50px]  w-full flex-center rounded-lg bg-tp-violet_900 text-white disabled:bg-gray-400'}>
            가입하기
          </button>
        </form>
        <div className='flex justify-center text-base mt-[24px] text-center font-GS  '>
          회원이 아니신가요?
          <Link href='/signin'>
            <div className='text-blue-600 hover:underline ml-1'>로그인하기</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

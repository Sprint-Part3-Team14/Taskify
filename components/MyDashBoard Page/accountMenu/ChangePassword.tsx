import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  currentPassword: string;
  newPassword: string;
  checkNewPassword: string;
};

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<Inputs> = data => {
    const currentPassword = data.currentPassword;
    const newPassword = data.newPassword;
    const checkNewPassword = data.checkNewPassword;

    console.log('currentPassword : ', currentPassword);
    console.log('newPassword : ', newPassword);
    console.log('checkNewPassword : ', checkNewPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      role='change-password-container'
      className='flex flex-col pt-8 px-7 pb-7 bg-white rounded-lg shadow-md w-[38.75rem]'>
      <h2 className='text-2xl text-tp-black_700 font-bold mb-8'>비밀번호 변경</h2>
      <div role='password-change-input-container' className='flex flex-col gap-5 mb-6'>
        <div className='flex flex-col gap-2.5'>
          <label htmlFor='current-password' className='text-lg text-tp-black_700'>
            현재 비밀번호
          </label>
          <input
            type='text'
            id='current-password'
            placeholder='현재 비밀번호 입력'
            className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 disabled:bg-white'
            {...register('currentPassword', {
              required: {
                value: true,
                message: '비밀번호를 입력해 주세요.',
              },
            })}
            aria-invalid={errors.currentPassword ? 'true' : 'false'}
          />
          {errors.currentPassword && <h2>{errors.currentPassword.message}</h2>}
        </div>
        <div className='flex flex-col gap-2.5'>
          <label htmlFor='new-password' className='text-lg text-tp-black_700'>
            새 비밀번호
          </label>
          <input
            type='password'
            id='new-password'
            placeholder='새 비밀번호 입력'
            className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 disabled:bg-white'
            {...register('newPassword', {
              required: {
                value: true,
                message: '새 비밀번호를 입력해 주세요.',
              },
            })}
            aria-invalid={errors.newPassword ? 'true' : 'false'}
          />
          {errors.newPassword && <h2>{errors.newPassword.message}</h2>}
        </div>
        <div className='flex flex-col gap-2.5'>
          <label htmlFor='new-password-check' className='text-lg text-tp-black_700'>
            새 비밀번호 확인
          </label>
          <input
            type='password'
            id='new-password-check'
            placeholder='현재 비밀번호 입력'
            className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 disabled:bg-white'
            {...register('checkNewPassword', {
              required: {
                value: true,
                message: '새 비밀번호를 입력해 주세요.',
              },
            })}
            aria-invalid={errors.checkNewPassword ? 'true' : 'false'}
          />
          {errors.checkNewPassword && <h2>{errors.currentPassword.message}</h2>}
        </div>
      </div>
      <button type='submit' className='self-end px-4 py-2.5'>
        버튼 대체
      </button>
    </form>
  );
};

export default ChangePassword;

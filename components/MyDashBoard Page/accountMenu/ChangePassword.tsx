import { SubmitHandler, useForm } from 'react-hook-form';

import SuccessPasswordChangeModal from '@/components/Modal/SuccessPasswordChangeModal';
import WrongPasswordModal from '@/components/Modal/WrongPasswordModal';
import { useHandleModal } from '@/hooks/useHandleModal';
import { changePassWord } from '@/utils/api/changePassword';

type Inputs = {
  currentPassword: string;
  newPassword: string;
  checkNewPassword: string;
};

const ChangePassword = () => {
  const wrongPassword = useHandleModal();
  const successChanged = useHandleModal();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const currentPassword = data.currentPassword;
    const newPassword = data.newPassword;
    const checkNewPassword = data.checkNewPassword;

    if (newPassword === checkNewPassword) {
      const tryChangePassword = {
        password: currentPassword,
        newPassword: newPassword,
      };
      try {
        await changePassWord({ changePasswordValue: tryChangePassword });
        successChanged.handleToggleModal();
      } catch (error: any) {
        error.message === '400' ? wrongPassword.handleToggleModal() : alert(error.message);
      }
    }
  };

  const checkNewPassword = newPasswordRepeat => {
    const newPasswordValue = getValues('newPassword');
    return newPasswordValue === newPasswordRepeat ? true : '비밀번호가 일치하지 않아요.';
  };

  return (
    <>
      {successChanged.isShowModal && <SuccessPasswordChangeModal handleModal={successChanged.handleToggleModal} />}
      {wrongPassword.isShowModal && <WrongPasswordModal handleModal={wrongPassword.handleToggleModal} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        role='change-password-container'
        className='flex flex-col pt-8 px-7 pb-7 bg-white rounded-lg shadow-md pc:w-[38.75rem] tb:w-[34rem] mb:w-[17.75rem]'>
        <h2 className='pc:text-2xl tb:text-2xl mb:text-xl text-tp-black_700 font-bold mb-8'>비밀번호 변경</h2>
        <div role='password-change-input-container' className='flex flex-col gap-5 mb-6'>
          <div className='flex flex-col gap-2.5 h-[7rem] w-full'>
            <label htmlFor='current-password' className='tb:text-lg mb:text-base text-tp-black_700'>
              현재 비밀번호
            </label>
            <input
              type='text'
              id='current-password'
              placeholder='현재 비밀번호를 입력해 주세요'
              className='p-3 rounded-md border border-solid border-tp-gray_700 outline-tp-violet_900 tb:placeholder:text-base mb:placeholder:text-sm'
              style={errors.currentPassword && { border: '1px solid red' }}
              {...register('currentPassword', {
                required: {
                  value: true,
                  message: '비밀번호를 입력해 주세요.',
                },
              })}
              aria-invalid={errors.currentPassword ? 'true' : 'false'}
            />
            {errors.currentPassword && <p className='text-sm text-red-500'>{errors.currentPassword.message}</p>}
          </div>
          <div className='flex flex-col gap-2.5 h-[7rem] w-full'>
            <label htmlFor='new-password' className='tb:text-lg mb:text-base text-tp-black_700'>
              새 비밀번호
            </label>
            <input
              type='password'
              id='new-password'
              placeholder='8자 이상 입력해 주세요'
              className='p-3 rounded-md border border-solid border-tp-gray_700 outline-tp-violet_900 tb:placeholder:text-base mb:placeholder:text-sm'
              style={errors.newPassword && { border: '1px solid red' }}
              {...register('newPassword', {
                required: {
                  value: true,
                  message: '새 비밀번호를 입력해 주세요.',
                },
                minLength: {
                  value: 8,
                  message: '8자 이상 입력해 주세요',
                },
              })}
              aria-invalid={errors.newPassword ? 'true' : 'false'}
            />
            {errors.newPassword && <p className='text-sm text-red-500'>{errors.newPassword.message}</p>}
          </div>
          <div className='flex flex-col gap-2.5 h-[7rem] w-full'>
            <label htmlFor='new-password-check' className='tb:text-lg mb:text-base text-tp-black_700'>
              새 비밀번호 확인
            </label>
            <input
              type='password'
              id='new-password-check'
              placeholder='새 비밀번호를 입력해 주세요'
              className='p-3 rounded-md border border-solid border-tp-gray_700 outline-tp-violet_900 tb:placeholder:text-base mb:placeholder:text-sm'
              style={errors.checkNewPassword && { border: '1px solid red' }}
              {...register('checkNewPassword', {
                required: {
                  value: true,
                  message: '비밀번호가 일지하지 않아요.',
                },
                validate: value => {
                  const result = checkNewPassword(value);
                  return result;
                },
              })}
              aria-invalid={errors.checkNewPassword ? 'true' : 'false'}
            />
            {errors.checkNewPassword && <p className='text-sm text-red-500'>{errors.checkNewPassword.message}</p>}
          </div>
        </div>
        <button
          type='submit'
          className='self-end px-7 py-2 bg-tp-violet_900 rounded-md text-white active:bg-violet-900 disabled:bg-tp-gray_700'>
          저장
        </button>
      </form>
    </>
  );
};

export default ChangePassword;

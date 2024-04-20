import SuccessPasswordChangeModal from '@/components/Modal/SuccessPasswordChangeModal';
import WrongPasswordModal from '@/components/Modal/WrongPasswordModal';
import { useHandleModal } from '@/hooks/useHandleModal';
import { changePassWord } from '@/utils/api/changePassword';
import { SubmitHandler, useForm } from 'react-hook-form';

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
        const result = await changePassWord({ changePasswordValue: tryChangePassword });

        if (result.message && result.message === '현재 비밀번호가 틀렸습니다.') {
          wrongPassword.handleToggleModal();
        }
        if (result === 'success') {
          successChanged.handleToggleModal();
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      {successChanged.isShowModal && <SuccessPasswordChangeModal handleModal={successChanged.handleToggleModal} />}
      {wrongPassword.isShowModal && <WrongPasswordModal handleModal={wrongPassword.handleToggleModal} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        role='change-password-container'
        className='flex flex-col pt-8 px-7 pb-7 bg-white rounded-lg shadow-md w-[38.75rem]'>
        <h2 className='text-2xl text-tp-black_700 font-bold mb-8'>비밀번호 변경</h2>
        <div role='password-change-input-container' className='flex flex-col gap-5 mb-6'>
          <div className='flex flex-col gap-2.5 h-[7rem]'>
            <label htmlFor='current-password' className='text-lg text-tp-black_700'>
              현재 비밀번호
            </label>
            <input
              type='text'
              id='current-password'
              placeholder='현재 비밀번호를 입력해 주세요'
              className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 outline-tp-violet_900'
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
          <div className='flex flex-col gap-2.5 h-[7rem]'>
            <label htmlFor='new-password' className='text-lg text-tp-black_700'>
              새 비밀번호
            </label>
            <input
              type='password'
              id='new-password'
              placeholder='8자 이상 입력해 주세요'
              className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 outline-tp-violet_900 '
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
          <div className='flex flex-col gap-2.5 h-[7rem]'>
            <label htmlFor='new-password-check' className='text-lg text-tp-black_700'>
              새 비밀번호 확인
            </label>
            <input
              type='password'
              id='new-password-check'
              placeholder='새 비밀번호를 입력해 주세요'
              className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 outline-tp-violet_900'
              style={errors.checkNewPassword && { border: '1px solid red' }}
              {...register('checkNewPassword', {
                required: {
                  value: true,
                  message: '새 비밀번호를 입력해 주세요.',
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

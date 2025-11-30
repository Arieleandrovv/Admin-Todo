import WidgetItem from '@/components/WidgetItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const session = await getServerSession(authOptions);

if (!session) {
  redirect('api/auth/signin');
}

const DashboardPage = () => {
  return (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2'>
      <WidgetItem title='Usuario conectado'>
        {JSON.stringify(session.user)}
      </WidgetItem>
    </div>
  );
};

export default DashboardPage;

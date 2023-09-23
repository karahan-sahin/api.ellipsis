import { Card, Title, Text } from '@tremor/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
}: {
}) {
    const session = await getServerSession(authOptions)
    if (!session) { redirect('/api/auth/signin?callbackUrl=/annotate' ) } 
    else { redirect('/annotate')}
  
}
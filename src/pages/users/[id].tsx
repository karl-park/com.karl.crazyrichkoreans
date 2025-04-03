import { useRouter } from 'next/router';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;

  return <div><h1>User Profile: {id}</h1></div>;
}
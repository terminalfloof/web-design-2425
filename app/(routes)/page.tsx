export const dynamic = 'force-dynamic';
import User from '@/components/User';

export default function Home() {
	return (
		<div>
			<h1>hello world.</h1>
			{/* <div className="absolute bottom-2 left-2"> */}
			<User />
			{/* </div> */}
		</div>
	);
}

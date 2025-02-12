import React from 'react'
import { Top } from './_top/Top'
import { Bottom } from './_bottom/Bottom'

export default function Homepage() {
    return (
        <div>
            <Top />
            <Bottom />
        </div>
    )
}

// // src/app/page.tsx
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route.ts';
// import Login from '@/components/Login';
// import Logout from '@/components/Logout';
// import { Top } from './_top/Top';
// import { Bottom } from './_bottom/Bottom';

// export default async function Homepage() {
//   const session = await getServerSession(authOptions);

//   return (
//     <div>
//       <Top />
//       {session ? (
//         <div>
//           <div>Your name is {session.user?.name}</div>
//           <div><Logout /></div>
//         </div>
//       ) : (
//         <div>
//           <Login />
//         </div>
//       )}
//       <Bottom />
//     </div>
//   );
// }
// // app/admin/index.jsx
// import { Stack, router } from 'expo-router';
// import React from 'react';
// import { Pressable, StyleSheet, Text, View } from 'react-native';

// const COLORS = {
//   green: '#355E3B',
//   bg: '#F7F4E9',
//   card: '#E6DFC5',
//   textDark: '#2E2E2E',
// };

// export default function AdminHome() {
//   return (
//     <View style={s.container}>
//       <Stack.Screen options={{ title: 'Admin – Plane ushqimi' }} />

//       <Text style={s.title}>Zgjidh planin për ta menaxhuar:</Text>

//       <Pressable
//         style={s.card}
//         onPress={() => router.push('/admin/shto_pesh')}
//       >
//         <Text style={s.cardTitle}>Shto Peshë</Text>
//         <Text style={s.cardSubtitle}>
//           CRUD për ushqimet e planit Shto Peshë
//         </Text>
//       </Pressable>

//       <Pressable
//         style={s.card}
//         onPress={() => router.push('/admin/humb_pesh')}
//       >
//         <Text style={s.cardTitle}>Humb Peshë</Text>
//         <Text style={s.cardSubtitle}>
//           CRUD për ushqimet e planit Humb Peshë
//         </Text>
//       </Pressable>

//       <Pressable
//         style={s.card}
//         onPress={() => router.push('/admin/mbaj_pesh')}
//       >
//         <Text style={s.cardTitle}>Mbaj Peshën</Text>
//         <Text style={s.cardSubtitle}>
//           CRUD për ushqimet e planit Mbaj Peshën
//         </Text>
//       </Pressable>
//     </View>
//   );
// }

// const s = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.bg,
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 16,
//     color: COLORS.green,
//   },
//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 4,
//     color: COLORS.textDark,
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: '#555',
//   },
// });
// app/admin/index.jsx
// app/admin/index.jsx
// app/admin/index.jsx
import { Stack, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../../firebaseConfig';

const COLORS = {
  green: '#355E3B',
  bg: '#F7F4E9',
  card: '#E6DFC5',
  textDark: '#2E2E2E',
};

export default function AdminHome() {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={s.container}>

      <Stack.Screen
        options={{
          title: 'Admin – Plane ushqimi',
          headerStyle: { backgroundColor: COLORS.green },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <Text style={s.title}>Zgjidh planin për ta menaxhuar:</Text>

      <Pressable
        style={s.card}
        onPress={() => router.push('/admin/ushqime/shto_pesh')}
      >
        <Text style={s.cardTitle}>Shto Peshë</Text>
        <Text style={s.cardSubtitle}>CRUD për ushqimet e planit Shto Peshë</Text>
      </Pressable>

      <Pressable
        style={s.card}
        onPress={() => router.push('/admin/ushqime/humb_pesh')}
      >
        <Text style={s.cardTitle}>Humb Peshë</Text>
        <Text style={s.cardSubtitle}>CRUD për ushqimet e planit Humb Peshë</Text>
      </Pressable>

      <Pressable
        style={s.card}
        onPress={() => router.push('/admin/ushqime/mbaj_pesh')}
      >
        <Text style={s.cardTitle}>Mbaj Peshën</Text>
        <Text style={s.cardSubtitle}>CRUD për ushqimet e planit Mbaj Peshën</Text>
      </Pressable>

   {/* BUTONI POSHT – Dil nga llogaria */}
<Pressable
  style={s.logoutBtn}
  onPress={async () => {
    try {
      await signOut(auth);       // del prej Firebase
      router.replace('/auth/login');  // direkt te login
    } catch (e) {
      console.log('Logout error:', e);
    }
  }}
>
  <Text style={s.logoutText}>Dil nga llogaria</Text>
</Pressable>

    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: COLORS.green,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: COLORS.textDark,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
  },

  logoutBtn: {
    marginTop: 40,
    backgroundColor: COLORS.green,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

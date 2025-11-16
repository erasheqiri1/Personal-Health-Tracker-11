// perdoret te admin/ushqime/shto,humb,mbaj pesh
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { db } from '../firebaseConfig';

const COLORS = {
  green: '#355E3B',
  bg: '#F7F4E9',
  card: '#E6DFC5',
  textDark: '#2E2E2E',
  cardSoft: '#EFE8CF',
};

export default function PlanMealsAdmin({ planKey, headerText }) {
  const [meals, setMeals] = useState([]);
  const [section, setSection] = useState('menges'); // menges | dreka | darke
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [calories, setCalories] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Leximi nga Firestore sipas planKey
  useEffect(() => {
    setLoading(true);

    const q = query(
      collection(db, 'meals'),
      where('plan', '==', planKey)
    );

    const unsub = onSnapshot(
      q,
      snapshot => {
        const list = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data(),
        }));
        setMeals(list);
        setLoading(false);
        setError('');
      },
      err => {
        console.log('Firestore error:', err);
        setError('S’u lexuan ushqimet.');
        setLoading(false);
      }
    );

    return () => unsub();
  }, [planKey]);

  const resetForm = () => {
    setSection('menges');
    setTitle('');
    setSubtitle('');
    setCalories('');
    setEditingId(null);
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    if (!title.trim() || !subtitle.trim() || !calories.trim()) {
      setError('Ploteso titullin, pershkrimin dhe kalorite.');
      return;
    }

    const kcalNum = Number(calories);
    if (Number.isNaN(kcalNum) || kcalNum <= 0) {
      setError('Kaloritë duhet të jenë numër pozitiv.');
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const ref = doc(db, 'meals', editingId);
        await updateDoc(ref, {
          section,
          title: title.trim(),
          subtitle: subtitle.trim(),
          calories: kcalNum,
        });
        setSuccess('U përditësua me sukses.');
      } else {
        await addDoc(collection(db, 'meals'), {
          plan: planKey,
          section,
          title: title.trim(),
          subtitle: subtitle.trim(),
          calories: kcalNum,
        });
        setSuccess('U shtua me sukses.');
      }

      resetForm();
    } catch (e) {
      console.log('Save error:', e);
      setError('S’u ruajt ushqimi.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = meal => {
    setEditingId(meal.id);
    setSection(meal.section);
    setTitle(meal.title);
    setSubtitle(meal.subtitle);
    setCalories(String(meal.calories));
    setError('');
    setSuccess('');
  };

  const handleDelete = async id => {
    setError('');
    setSuccess('');
    try {
      await deleteDoc(doc(db, 'meals', id));
      setSuccess('U fshi me sukses.');
      if (editingId === id) resetForm();
    } catch (e) {
      console.log('Delete error:', e);
      setError('S’u fshi ushqimi.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={s.mealRow}>
      <View style={{ flex: 1 }}>
        <Text style={s.mealSection}>
          {item.section === 'menges'
            ? 'Mëngjes'
            : item.section === 'dreka'
            ? 'Dreka'
            : 'Darkë'}
        </Text>
        <Text style={s.mealTitle}>{item.title}</Text>
        <Text style={s.mealSubtitle}>{item.subtitle}</Text>
        <Text style={s.mealKcal}>{item.calories} kcal</Text>
      </View>
      <View style={s.mealActions}>
        <Pressable style={s.smallBtn} onPress={() => handleEdit(item)}>
          <Text style={s.smallBtnText}>Edit</Text>
        </Pressable>
        <Pressable
          style={[s.smallBtn, { backgroundColor: '#C0392B' }]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={s.smallBtnText}>Fshi</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={s.container}>
      <Text style={s.header}>{headerText}</Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.green} />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{ marginBottom: 12 }}>
              Nuk ka ushqime ende për këtë plan.
            </Text>
          }
        />
      )}

      <View style={s.divider} />

      <Text style={s.subHeader}>
        {editingId ? 'Përditëso ushqimin' : 'Shto ushqim të ri'}
      </Text>

      <View style={s.sectionRow}>
        <Pressable
          style={[s.sectionChip, section === 'menges' && s.sectionChipActive]}
          onPress={() => setSection('menges')}
        >
          <Text
            style={[
              s.sectionChipText,
              section === 'menges' && s.sectionChipTextActive,
            ]}
          >
            Mëngjes
          </Text>
        </Pressable>
        <Pressable
          style={[s.sectionChip, section === 'dreka' && s.sectionChipActive]}
          onPress={() => setSection('dreka')}
        >
          <Text
            style={[
              s.sectionChipText,
              section === 'dreka' && s.sectionChipTextActive,
            ]}
          >
            Drekë
          </Text>
        </Pressable>
        <Pressable
          style={[s.sectionChip, section === 'darke' && s.sectionChipActive]}
          onPress={() => setSection('darke')}
        >
          <Text
            style={[
              s.sectionChipText,
              section === 'darke' && s.sectionChipTextActive,
            ]}
          >
            Darkë
          </Text>
        </Pressable>
      </View>

      <TextInput
        style={s.input}
        placeholder="Titulli"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={s.input}
        placeholder="Përshkrimi"
        value={subtitle}
        onChangeText={setSubtitle}
      />
      <TextInput
        style={s.input}
        placeholder="Kaloritë"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      {error ? <Text style={s.error}>{error}</Text> : null}
      {success ? <Text style={s.success}>{success}</Text> : null}

      <Pressable style={s.saveBtn} onPress={handleSave} disabled={saving}>
        <Text style={s.saveBtnText}>
          {saving
            ? 'Duke u ruajtur...'
            : editingId
            ? 'Ruaj ndryshimet'
            : 'Shto ushqim'}
        </Text>
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
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.green,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: '#D0C8AA',
    marginVertical: 12,
  },
  mealRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  mealSection: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.green,
    marginBottom: 2,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  mealSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  mealKcal: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.green,
  },
  mealActions: {
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  smallBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  smallBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  sectionChip: {
    flex: 1,
    backgroundColor: COLORS.cardSoft,
    paddingVertical: 8,
    marginRight: 6,
    borderRadius: 20,
    alignItems: 'center',
  },
  sectionChipActive: {
    backgroundColor: COLORS.green,
  },
  sectionChipText: {
    fontSize: 16,
    color: COLORS.textDark,
  },
  sectionChipTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D0C8AA',
    marginBottom: 8,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  error: {
    color: '#C0392B',
    fontSize: 16,
    marginBottom: 4,
  },
  success: {
    color: '#1E8449',
    fontSize: 16,
    marginBottom: 4,
  },
});

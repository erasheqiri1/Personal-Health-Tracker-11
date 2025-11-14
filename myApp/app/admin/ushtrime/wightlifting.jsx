

import { Stack } from 'expo-router';
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
import { db } from '../../../firebaseConfig';

const COLORS = {
  green: '#355E3B',
  bg: '#F7F4E9',
  card: '#E6DFC5',
  textDark: '#2E2E2E',
  cardSoft: '#EFE8CF',
};

// ky file është për planin "Home Workout"
const PLAN_KEY = 'weightlifting';

export default function WeightliftingAdmin() {
  const [workouts, setWorkouts] = useState([]);
  const [section, setSection] = useState('upper'); // upper | lower | full
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [calories, setCalories] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // READ – leximi i ushtrimeve për planin "homeworkout"
  useEffect(() => {
    setLoading(true);

    const q = query(
      collection(db, 'workouts'),
      where('plan', '==', PLAN_KEY),
    );

    const unsub = onSnapshot(
      q,
      snapshot => {
        const list = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data(),
        }));
        setWorkouts(list);
        setLoading(false);
        setError('');
      },
      err => {
        console.log('Firestore error:', err);
        setError('S’u lexuan ushtrimet.');
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const resetForm = () => {
    setSection('upper');
    setTitle('');
    setSubtitle('');
    setCalories('');
    setEditingId(null);
  };

  // CREATE / UPDATE
  const handleSave = async () => {
    setError('');
    setSuccess('');

    if (!title.trim() || !subtitle.trim() || !calories.trim()) {
      setError('Ploteso titullin, përshkrimin dhe kaloritë.');
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
        // UPDATE
        const ref = doc(db, 'workouts', editingId);
        await updateDoc(ref, {
          section,
          title: title.trim(),
          subtitle: subtitle.trim(),
          calories: kcalNum,
        });
        setSuccess('U përditësua ushtrimi.');
      } else {
        // CREATE
        await addDoc(collection(db, 'workouts'), {
          plan: PLAN_KEY,
          section,
          title: title.trim(),
          subtitle: subtitle.trim(),
          calories: kcalNum,
        });
        setSuccess('U shtua ushtrimi.');
      }

      resetForm();
    } catch (e) {
      console.log('Save error:', e);
      setError('S’u ruajt ushtrimi.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = item => {
    setEditingId(item.id);
    setSection(item.section);
    setTitle(item.title);
    setSubtitle(item.subtitle);
    setCalories(String(item.calories));
    setError('');
    setSuccess('');
  };

  const handleDelete = async id => {
    setError('');
    setSuccess('');
    try {
      await deleteDoc(doc(db, 'workouts', id));
      setSuccess('U fshi ushtrimi.');
      if (editingId === id) resetForm();
    } catch (e) {
      console.log('Delete error:', e);
      setError('S’u fshi ushtrimi.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={s.row}>
      <View style={{ flex: 1 }}>
        <Text style={s.sectionText}>
          {item.section === 'upper'
            ? 'Trup i sipërm'
            : item.section === 'lower'
            ? 'Trup i poshtëm'
            : 'Gjithë trupi'}
        </Text>
        <Text style={s.title}>{item.title}</Text>
        <Text style={s.subtitle}>{item.subtitle}</Text>
        <Text style={s.kcal}>{item.calories} kcal</Text>
      </View>
      <View style={s.actions}>
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
      <Stack.Screen options={{ title: 'Admin – Home Workout' }} />

      <Text style={s.header}>Ushtrimet e planit: Home Workout</Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.green} />
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{ marginBottom: 12 }}>
              Nuk ka ushtrime ende për këtë plan.
            </Text>
          }
        />
      )}

      <View style={s.divider} />

      <Text style={s.subHeader}>
        {editingId ? 'Përditëso ushtrimin' : 'Shto ushtrim të ri'}
      </Text>

      {/* Zgjedhja e seksionit */}
      <View style={s.sectionRow}>
        <Pressable
          style={[s.sectionChip, section === 'upper' && s.sectionChipActive]}
          onPress={() => setSection('upper')}
        >
          <Text
            style={[
              s.sectionChipText,
              section === 'upper' && s.sectionChipTextActive,
            ]}
          >
            Trup i sipërm
          </Text>
        </Pressable>
        <Pressable
          style={[s.sectionChip, section === 'lower' && s.sectionChipActive]}
          onPress={() => setSection('lower')}
        >
          <Text
            style={[
              s.sectionChipText,
              section === 'lower' && s.sectionChipTextActive,
            ]}
          >
            Trup i poshtëm
          </Text>
        </Pressable>
        <Pressable
          style={[s.sectionChip, section === 'full' && s.sectionChipActive]}
          onPress={() => setSection('full')}
        >
          <Text
            style={[
              s.sectionChipText,
              section === 'full' && s.sectionChipTextActive,
            ]}
          >
            Gjithë trupi
          </Text>
        </Pressable>
      </View>

      <TextInput
        style={s.input}
        placeholder="Titulli (p.sh. Bench Press...)"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={s.input}
        placeholder="Përshkrimi (p.sh. 3 sete x 10 rep...)"
        value={subtitle}
        onChangeText={setSubtitle}
      />
      <TextInput
        style={s.input}
        placeholder="Kaloritë (p.sh. 250)"
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
            : 'Shto ushtrim'}
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
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.green,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: '#D0C8AA',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.green,
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
  },
  kcal: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.green,
  },
  actions: {
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
    fontSize: 12,
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
    fontSize: 13,
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
    fontSize: 14,
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
  },
  error: {
    color: '#C0392B',
    fontSize: 13,
    marginBottom: 4,
  },
  success: {
    color: '#1E8449',
    fontSize: 13,
    marginBottom: 4,
  },
});

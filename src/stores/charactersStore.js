import { ref } from 'vue';
import { defineStore } from 'pinia';

const useCharactersStore = defineStore('Characters store', () => {

    const gender = ref(null);
    const status = ref(null);
    const occupation = ref(null);
    const occupations = ref(
        [
            'Soldier', 
            'Thug', 
            'Horse', 
            'Serial killer', 
            'Warrior', 
            'Commander-in-chief', 
            'Noble', 
            'King', 
            'unknown', 
            'Queen', 
            'Slave', 
            'Ambassador', 
            'Mayor', 
            'Order of the Walls', 
            'Housewife', 
            'Hunter', 
            'Merchant', 
            'Hired thug', 
            'Journalist',
            'Pastor', 
            'Field Worker',
            'Escort',
            'Doctor',
            'Waitress',
            'Human traffickers',
            'Gardener[1]',
            'Hunter[2]',
            'Prostitute',
            'Teacher',
            'Hypnotist'
        ]
        )

    return { gender, status, occupation, occupations }
})

export default useCharactersStore
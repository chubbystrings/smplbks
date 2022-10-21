import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import axiosInstance from "@/services/axios";
import { TABLE } from "@/types";
import {useStore} from '@/store';

const useFilms = () => {
  const isLoading = ref(false);
  const store = useStore()
  const tableData = reactive<TABLE>({
    header: [
      "Film Title",
      "Release Date",
      "Director",
      "Producer",
      "Episode ID",
      "Character",
    ],
    data: [],
  });

  const cardData = ref([
    {
      name: "Films",
      color: "#A9FFE0",
      value: 0,
    },
    {
      name: "Starships",
      color: "#A9C1FF",
      value: 0,
    },
    {
      name: "People",
      color: "#FFA9EC",
      value: 0,
    },
    {
      name: "Species",
      color: "#FDFFA9",
      value: 0,
    },
  ]);

  const starships = ref(0);
  const people = ref(0);
  const species = ref(0);

  onMounted(() => {
    (async () => {
      isLoading.value = true;
      try {

        const data = await axiosInstance.get('/films');

        const table: TABLE = {
          header: [
            "Film Title",
            "Release Date",
            "Director",
            "Producer",
            "Episode ID",
            "Character",
          ],
          data: [],
        };

        data.data.results.forEach((item: any, i: number) => {
          starships.value += item.starships.length;
          people.value += item.characters.length;
          species.value += item.species.length;

          const result = {
            id: i + 1,
            title: item.title,
            date: item.release_date,
            director: item.director,
            producer: item.producer,
            episodeId: item.episode_id,
            character: item.characters[0],
          };
          table.data.push(result);
        });

        tableData.header = table.header;
        tableData.data = table.data;

        cardData.value.map((v) => {
          if (v.name === "Films") {
            v.value = data.data.results.length;
            return v;
          }

          if (v.name === "Starships") {
            v.value = starships.value;
            return v;
          }

          if (v.name === "People") {
            v.value = people.value;
            return v;
          }

          if (v.name === "Species") {
            v.value = species.value;
            return v;
          }

          return v;
        });

        
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        store.setNotification("Oops! cannot retrieve data at the moment try again later");
      }
    })();
  });

  return { cardData, tableData, isLoading };
};

export default useFilms;

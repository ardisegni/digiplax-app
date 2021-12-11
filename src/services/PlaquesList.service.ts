import { PlaqueModel } from '@/models/Plaque.model';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export default class PlaquesListService {
  private readonly baseUrl = process.env.VUE_APP_ROOT_API;

  fetchPlaques(project: string): Observable<PlaqueModel[]> {
    return from(
      axios.get<PlaqueModel[]>(`${this.baseUrl}/api/streamPlaques`, {
        params: { project }
      })
    ).pipe(map(response => response.data));
  }

  fetchScheduledPlaques(project: string): Observable<PlaqueModel[]> {
    return from(
      axios.get<PlaqueModel[]>(`${this.baseUrl}/api/getScheduledPlaques`, {
        params: { project }
      })
    ).pipe(map(response => response.data));
  }
}

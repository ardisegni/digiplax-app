import { PlaqueModel } from '@/models/Plaque.model';
import PlaquesListService from '@/services/PlaquesList.service';
import $ from 'jquery';
import { interval } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class PlaquesStreamingComponent extends Vue {
  private readonly INTERVAL_IN_SECONDS: number = 60;

  private plaquesListService!: PlaquesListService;

  public plaques: PlaqueModel[] = [];
  public selectedPlaque: PlaqueModel = { plaqueText: '', plaqueHtmlText: '' };
  public filtering: boolean = false;
  public plaqueSearch: string = '';
  public showSearch: boolean = false;

  mounted() {
    this.plaquesListService = new PlaquesListService();
    this.fetchPlaques();

    interval(this.INTERVAL_IN_SECONDS * 1000)
      .pipe(startWith(0))
      .subscribe(() => {
        this.fetchScheduledPlaques();
      });
  }

  public onReloadClick() {
    this.selectedPlaque.plaqueText = '';
    setTimeout(() => {
      this.filtering = false;
      ($('#carouselExampleControls') as any).carousel('cycle');
    }, 1000);

    this.fetchPlaques();
  }

  private fetchScheduledPlaques() {
    this.plaquesListService
      .fetchScheduledPlaques(this.$route.params.project)
      .pipe(filter(data => data.length > 0))
      .subscribe(data => {
        if (!data) {
          return;
        }

        this.filtering = true;
        setTimeout(() => {
          this.plaques = data;
          this.filtering = false;
          ($('#carouselExampleControls') as any).carousel('cycle');
        }, 500);
      });
  }

  private fetchPlaques() {
    this.plaquesListService
      .fetchPlaques(this.$route.params.project)
      .subscribe(data => (this.plaques = data));
  }

  get filteredPlaques(): PlaqueModel[] {
    if (this.selectedPlaque && this.selectedPlaque.plaqueText.length > 5) {
      const filteredPlaques = this.plaques.filter((plaque: any) => {
        return plaque.plaqueText.indexOf(this.selectedPlaque.plaqueText) > -1;
      });

      if (filteredPlaques.length > 0) {
        this.filtering = true;
        setTimeout(() => {
          this.filtering = false;
        }, 100);

        return filteredPlaques;
      }
    }

    return this.plaques;
  }
}

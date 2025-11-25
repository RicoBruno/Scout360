import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../services/dashboard.service';
import { SessaoPerformanceService } from '../../services/sessao-performance.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;
  let sessaoService: jasmine.SpyObj<SessaoPerformanceService>;

  beforeEach(async () => {
    const dashboardSpy = jasmine.createSpyObj('DashboardService', ['getDashboardStats']);
    const sessaoSpy = jasmine.createSpyObj('SessaoPerformanceService', ['getSessoes']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientTestingModule],
      providers: [
        { provide: DashboardService, useValue: dashboardSpy },
        { provide: SessaoPerformanceService, useValue: sessaoSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
    sessaoService = TestBed.inject(SessaoPerformanceService) as jasmine.SpyObj<SessaoPerformanceService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard stats on init', () => {
    const mockStats = {
      totalJogadores: 5,
      totalSessoesUltimos7Dias: 10,
      mediaDistanciaUltimos7Dias: 8500,
      mediaCargaTrabalhoUltimos7Dias: 7500
    };

    dashboardService.getDashboardStats.and.returnValue(of(mockStats));
    sessaoService.getSessoes.and.returnValue(of([]));

    component.ngOnInit();

    expect(dashboardService.getDashboardStats).toHaveBeenCalled();
    expect(component.stats).toEqual(mockStats);
  });
});
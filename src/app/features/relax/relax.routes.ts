import { Routes } from '@angular/router';
import { ColorClashManagerService } from './games/color-clash/services/color-clash-manager.service';
import { quantumQuizPlayGuard } from './games/quantum-quiz/guards/quantum-quiz-play.guard';
import { quantumQuizWonGuard } from './games/quantum-quiz/guards/quantum-quiz-won.guard';
import { QuizManagerService } from './games/quantum-quiz/services/quiz-manager.service';

export const RELAX_ROUTES: Routes = [
  {
    path: 'relax',
    children: [
      {
        path: '',
        data: { animation: 'RelaxPage' },
        loadComponent: () =>
          import('./relax.component').then((m) => m.RelaxComponent),
      },
      {
        path: 'quantum-quiz',
        data: { animation: 'QuantumQuizPage' },
        providers: [QuizManagerService],
        loadComponent: () =>
          import('./games/quantum-quiz/quantum-quiz.component').then(
            (m) => m.QuantumQuizComponent,
          ),
        children: [
          {
            path: 'instruction',
            data: { animation: 'QuantumQuizPageInstruction' },
            outlet: 'state',
            loadComponent: () =>
              import(
                './games/quantum-quiz/components/quantum-quiz-instruction/quantum-quiz-instruction.component'
              ).then((m) => m.QuantumQuizInstructionComponent),
          },
          {
            path: 'choose-topic',
            data: { animation: 'QuantumQuizPageChooseTopic' },
            outlet: 'state',
            loadComponent: () =>
              import(
                './games/quantum-quiz/components/quantum-quiz-choose-topic/quantum-quiz-choose-topic.component'
              ).then((m) => m.QuantumQuizChooseTopicComponent),
          },
          {
            path: 'generate',
            data: { animation: 'QuantumQuizPageGenerate' },
            outlet: 'state',
            canActivate: [quantumQuizPlayGuard],
            loadComponent: () =>
              import(
                './games/quantum-quiz/components/quantum-quiz-generate-quiz/quantum-quiz-generate-quiz.component'
              ).then((m) => m.QuantumQuizGenerateQuizComponent),
          },
          {
            path: 'play',
            data: { animation: 'QuantumQuizPagePlay' },
            outlet: 'state',
            canActivate: [quantumQuizPlayGuard],
            loadComponent: () =>
              import(
                './games/quantum-quiz/components/quantum-quiz-game/quantum-quiz-game.component'
              ).then((m) => m.QuantumQuizGameComponent),
          },
          {
            path: 'won',
            data: { animation: 'QuantumQuizPageWon' },
            outlet: 'state',
            canActivate: [quantumQuizWonGuard],
            loadComponent: () =>
              import(
                './games/quantum-quiz/components/quantum-quiz-won/quantum-quiz-won.component'
              ).then((m) => m.QuantumQuizWonComponent),
          },
          {
            path: 'loose',
            data: { animation: 'QuantumQuizPageLoose' },
            outlet: 'state',
            loadComponent: () =>
              import(
                './games/quantum-quiz/components/quantum-quiz-loose/quantum-quiz-loose.component'
              ).then((m) => m.QuantumQuizLooseComponent),
          },
          {
            path: 'hacker',
            data: { animation: 'QuantumQuizPageHacker' },
            outlet: 'state',
            loadComponent: () =>
              import(
                './games/quantum-quiz/components/quantum-quiz-hacker/quantum-quiz-hacker.component'
              ).then((m) => m.QuantumQuizHackerComponent),
          },
          {
            path: '**',
            redirectTo: () => {
              // Angular have an issue in version 19.1 that direct redirect
              // without function block the full ui when reloading in the specific outlet
              return '/relax/quantum-quiz/(state:instruction)';
            },
          },
        ],
      },
      {
        path: 'color-clash',
        data: { animation: 'ColorClashPage' },
        providers: [ColorClashManagerService],
        loadComponent: () =>
          import('./games/color-clash/color-clash.component').then(
            (m) => m.ColorClashComponent,
          ),
        children: [
          {
            path: 'instruction',
            data: { animation: 'ColorClashPageInstruction' },
            outlet: 'state',
            loadComponent: () =>
              import(
                './games/color-clash/components/color-clash-instruction/color-clash-instruction.component'
              ).then((m) => m.ColorClashInstructionComponent),
          },
          {
            path: 'play',
            data: { animation: 'ColorClashPagePlay' },
            outlet: 'state',
            loadComponent: () =>
              import(
                './games/color-clash/components/color-clash-game/color-clash-game.component'
              ).then((m) => m.ColorClashGameComponent),
          },
          {
            path: 'evaluation',
            data: { animation: 'ColorClashPageEvaluation' },
            outlet: 'state',
            loadComponent: () =>
              import(
                './games/color-clash/components/color-clash-evaluation/color-clash-evaluation.component'
              ).then((m) => m.ColorClashEvaluationComponent),
          },
          {
            path: '**',
            redirectTo: () => {
              // Angular have an issue in version 19.1 that direct redirect
              // without function block the full ui when reloading in the specific outlet
              return '/relax/color-clash/(state:instruction)';
            },
          },
        ],
      },
      {
        path: '**',
        redirectTo: '/relax',
      },
    ],
  },
];

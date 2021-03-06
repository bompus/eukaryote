var ReproductionStrategy = require('../../src/genetic/reproduction-strategy');

describe('ReproductionStrategy', function() {

  ////////////
  // Random //
  ////////////

  describe('Random', function() {

    it('should choose one individuals from population', function() {
      var strategy = ReproductionStrategy.Random({
        numberOfIndividuals: 1
      });
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(1);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
    });

    it('should choose two individuals from population by default', function() {
      var strategy = ReproductionStrategy.Random();
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(2);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
    });

    it('should choose same individual twice when population size not sufficient', function() {
      var strategy = ReproductionStrategy.Random({
        numberOfIndividuals: 2
      });
      var population = [1];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(2);
      expect(individuals[0]).toBe(1);
      expect(individuals[1]).toBe(1);
    });

    it('should throw error when numberOfIndividuals too low', function() {
      expect(function() {
        ReproductionStrategy.Random({
          numberOfIndividuals: 0
        });
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
      expect(function() {
        ReproductionStrategy.Random({
          numberOfIndividuals: -1
        });
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
    });

    it('should allow more than two individuals to reproduce', function() {
      // 3 individuals
      var strategy = ReproductionStrategy.Random({
        numberOfIndividuals: 3
      });
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(3);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
      // all individuals
      strategy = ReproductionStrategy.Random({
        numberOfIndividuals: 10
      });
      strategy.begin();
      individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(10);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
    });

  }); // End Random

  ////////////////
  // Sequential //
  ////////////////

  describe('Sequential', function() {

    it('should choose one individual sequentially', function() {
      var strategy = ReproductionStrategy.Sequential({
        numberOfIndividuals: 1
      });
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(1);
      expect(individuals[0]).toBe(1);
    });

    it('should choose two individuals sequentially by default', function() {
      var strategy = ReproductionStrategy.Sequential();
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(2);
      expect(individuals[0]).toBe(1);
      expect(individuals[1]).toBe(2);
    });

    it('should choose same individual twice when population size not sufficient', function() {
      var strategy = ReproductionStrategy.Sequential({
        numberOfIndividuals: 2
      });
      var population = [1];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(2);
      expect(individuals[0]).toBe(1);
      expect(individuals[1]).toBe(1);
    });

    it('should remember the last two individuals chosen on second reproduce call', function() {
      var strategy = ReproductionStrategy.Sequential({
        numberOfIndividuals: 2
      });
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      expect(individuals.length).toBe(2);
      expect(individuals[0]).toBe(1);
      expect(individuals[1]).toBe(2);
      var newIndividuals = strategy.reproduce(population);
      expect(individuals.length).toBe(2);
      expect(newIndividuals[0]).toBe(3);
      expect(newIndividuals[1]).toBe(4);
      strategy.end();
    });

    it('should choose individuals twice if entire population has already been chosen to reproduce', function() {
      var strategy = ReproductionStrategy.Sequential({
        numberOfIndividuals: 2
      });
      var population = [1, 2, 3, 4];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      expect(individuals[0]).toBe(1);
      expect(individuals[1]).toBe(2);
      individuals = strategy.reproduce(population);
      expect(individuals[0]).toBe(3);
      expect(individuals[1]).toBe(4);
      individuals = strategy.reproduce(population);
      expect(individuals[0]).toBe(1);
      expect(individuals[1]).toBe(2);
      strategy.end();
    });

    it('should allow more than 2 individuals to reproduce', function() {
      // 3 individuals
      var strategy = ReproductionStrategy.Sequential({
        numberOfIndividuals: 3
      });
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(3);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
      // all individuals
      strategy = ReproductionStrategy.Sequential({
        numberOfIndividuals: 10
      });
      population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(10);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
    });

    it('should throw an error when numberOfIndividuals is too low', function() {
      expect(function() {
        var strategy = ReproductionStrategy.Sequential({
          numberOfIndividuals: 0
        });
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
      expect(function() {
        var strategy = ReproductionStrategy.Sequential({
          numberOfIndividuals: -1
        });
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
    });

  }); // End Sequential

  //////////////////////
  // SequentialRandom //
  //////////////////////

  describe('SequentialRandom', function() {

    it('should choose two individuals', function() {
      var strategy = ReproductionStrategy.SequentialRandom({
        numberOfIndividuals: 2
      });
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(2);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
      if (individuals[0] !== 1 && individuals[1] !== 1) {
        fail('At least one chosen individual should have been chosen sequentially.');
      }
    });

    it('should choose two individuals by default', function() {
      var strategy = ReproductionStrategy.SequentialRandom();
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(2);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
    });

    it('should choose same individual twice when population size not sufficient', function() {
      var strategy = ReproductionStrategy.SequentialRandom({
        numberOfIndividuals: 2
      });
      var population = [1];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(2);
      expect(individuals[0]).toBe(1);
      expect(individuals[1]).toBe(1);
    });

    it('should remember the last sequential individual on the second reproduce call', function() {
      var strategy = ReproductionStrategy.SequentialRandom({
        numberOfIndividuals: 2
      });
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      expect(individuals.length).toBe(2);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
      individuals = strategy.reproduce(population);
      expect(individuals.length).toBe(2);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
      if (individuals[0] !== 2 && individuals[1] !== 2) {
        fail('At least one chosen individual should have been chosen sequentially.');
      }
      strategy.end();
    });

    it('should choose individuals twice if the entire population has already been chosen to reproduce', function() {
      var strategy = ReproductionStrategy.SequentialRandom({
        numberOfIndividuals: 2
      });
      var population = [1, 2, 3, 4];
      strategy.begin();
      var assertOneIndividual = function(individuals, i) {
        if (individuals[0] !== i && individuals[1] !== i) {
          fail('At least one chosen individual should have been chosen sequentially.');
        }
      };
      var individuals = strategy.reproduce(population);
      assertOneIndividual(individuals, 1);
      individuals = strategy.reproduce(population);
      assertOneIndividual(individuals, 2);
      individuals = strategy.reproduce(population);
      assertOneIndividual(individuals, 3);
      individuals = strategy.reproduce(population);
      assertOneIndividual(individuals, 4);
      individuals = strategy.reproduce(population);
      assertOneIndividual(individuals, 1);
      strategy.end();
    });

    it('should allow more than two individuals to reproduce', function() {
      // 3 individuals
      var strategy = ReproductionStrategy.SequentialRandom({
        numberOfIndividuals: 3
      });
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(3);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
      // all individuals
      strategy = ReproductionStrategy.SequentialRandom({
        numberOfIndividuals: 10
      });
      population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      individuals = strategy.reproduce(population);
      strategy.end();
      expect(individuals.length).toBe(10);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
    });

    it('should throw an error when numberOfIndividuals is too low', function() {
      expect(function() {
        ReproductionStrategy.SequentialRandom({
          numberOfIndividuals: 1
        });
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
      expect(function() {
        ReproductionStrategy.SequentialRandom({
          numberOfIndividuals: 0
        });
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
      expect(function() {
        ReproductionStrategy.SequentialRandom({
          numberOfIndividuals: -1
        });
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
    });

  }); // End SequentialRandom

}); // End ReproductionStrategy
